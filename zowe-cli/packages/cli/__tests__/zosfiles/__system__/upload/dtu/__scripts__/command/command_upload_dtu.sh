#!/bin/bash
set -e
echo "================ Z/OS FILES UPLOAD LOCAL DIRECTORY TO USS DIRECTORY==============="
zowe zos-files upload dir-to-uss "$1" "$2" ${@:3}
if [ $? -gt 0 ]
then
    exit $?
fi