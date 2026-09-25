#!/usr/bin/env bash
set -uo pipefail

# Use the venv baked into the image (Linux). Ignore invalid host paths e.g. Windows Scripts\python.exe.
DOCKER_PYTHON="/app/.venv-markitdown/bin/python"
if [[ ! -x "${DOC_PARSER_PYTHON_PATH:-}" ]]; then
	if [[ -n "${DOC_PARSER_PYTHON_PATH:-}" ]]; then
		echo "DOC_PARSER_PYTHON_PATH is not executable (${DOC_PARSER_PYTHON_PATH}); using ${DOCKER_PYTHON}"
	fi
	export DOC_PARSER_PYTHON_PATH="${DOCKER_PYTHON}"
fi
export DOC_PARSER_SCRIPT_PATH="${DOC_PARSER_SCRIPT_PATH:-/app/src/services/python/parse_document.py}"

api_pid=""
worker_pid=""

cleanup() {
  if [[ -n "$api_pid" ]]; then
    kill "$api_pid" 2>/dev/null || true
  fi

  if [[ -n "$worker_pid" ]]; then
    kill "$worker_pid" 2>/dev/null || true
  fi

  wait 2>/dev/null || true
}

trap cleanup EXIT INT TERM

# Start the API first so the platform's port scan sees an open port right
# away. Running migrations before this delays port binding, and hosts such as
# Render cancel the deploy with "no open ports detected".
echo "Starting API server"
bun --smol src/index.ts &
api_pid=$!

echo "Running database migrations"
if bunx prisma migrate deploy; then
	echo "Database migrations applied"
else
	echo "WARNING: prisma migrate deploy failed; the API is still serving but the schema may be out of date"
fi

echo "Starting background workers"
bun --smol src/worker.ts &
worker_pid=$!

wait -n "$api_pid" "$worker_pid"