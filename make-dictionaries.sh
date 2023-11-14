#!/usr/bin/bash

cat 'data/toadua/dump.json' | jq '[.[] | select((.head|test("^[a-zı]+$")) and (.head|length)>3 and (.score > 1 or .user == "official")) | .head | sub("ı"; "i"; "g")]' >src/targets.json
cat 'data/toadua/dump.json' | jq '[.[] | select((.head|test("^[a-zı]+$")) and (.head|length)>3) | .head | sub("ı"; "i"; "g")]' >src/dictionary.json
