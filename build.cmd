d:
cd workspace\titanium\pictalk
lsc -co  Resources livescripts
adb -d logcat | grep -G '\(TiAPI\)\|\(TiApp\)'