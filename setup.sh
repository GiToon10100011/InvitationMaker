#!/bin/bash

# Git 별칭 설정
git config --local alias.acp '!f() { git add . && git commit -m "$1" && git push; }; f'

# 다른 프로젝트 설정들도 추가 가능
echo "Git 별칭이 설정되었습니다."
echo "이제 'git acp \"커밋 메시지\"' 명령어를 사용할 수 있습니다." 