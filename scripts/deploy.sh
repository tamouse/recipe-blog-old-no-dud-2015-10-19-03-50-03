#!/bin/sh
#
# Simple deploy script for this blog.

: ${DEPLOY:=gh-pages}

set -v
jekyll build -d $DEPLOY
cd $DEPLOY
git add --all --verbose
git commit --allow-empty -m "Published $(date)"
git push -fu origin HEAD
cd ..
