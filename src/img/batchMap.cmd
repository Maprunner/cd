@echo off
rem From terminal enter "Powershell ./batchMap"

rem Path to Irfan view
set iview="c:\Program Files\IrfanView\i_view64.exe"
start "IrfanView" /wait %iview% features-2020-05-01.png /resize=(3600,1500) /resample /convert=input.png

start "IrfanView" /wait %iview% input.png /crop=(3151,301,150,150,0) /convert=900.png
goto end


rem IrfanView could not be found.
:noiview
echo IrfanView not found in the given path:
echo   %iview%
goto end

rem End of the script
:end
endlocal