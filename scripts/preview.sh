#!/bin/sh
set -v

: ${LIMIT_POSTS:=10}
: ${PORT:=4001}

jekyll serve -P $PORT --baseurl='' --limit_posts $LIMIT_POSTS
