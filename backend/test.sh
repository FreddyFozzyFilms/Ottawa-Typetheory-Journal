#!bin/bash
cd leanproj
echo '{ "command": "info", "file_name": "./src/test.lean", "line": 3, "column": 11, "seq_num": 2}' | lean --server