@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 보듬길 데모를 4187 포트로 실행합니다.
echo 같은 와이파이에서 http://192.168.0.65:4187/ 을 열어주세요.
echo 이 창을 닫으면 서버가 종료됩니다.
call corepack pnpm preview --host 0.0.0.0 --port 4187 --strictPort
pause
