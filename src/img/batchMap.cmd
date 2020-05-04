@echo off
rem From terminal enter "Powershell ./batchMap"

rem Path to Irfan view
set iview="c:\Program Files\IrfanView\i_view64.exe"
start "IrfanView" /wait %iview% features-2020-05-01.png /resize=(3600,1500) /resample /convert=input.png
start "IrfanView" /wait %iview% input.png /crop=(0,0,150,150,0) /convert=101.png
start "IrfanView" /wait %iview% input.png /crop=(0,151,150,150,0) /convert=102.png
start "IrfanView" /wait %iview% input.png /crop=(0,301,150,150,0) /convert=103.png
start "IrfanView" /wait %iview% input.png /crop=(0,451,150,150,0) /convert=104.png
start "IrfanView" /wait %iview% input.png /crop=(0,601,150,150,0) /convert=105.png
start "IrfanView" /wait %iview% input.png /crop=(0,751,150,150,0) /convert=106.png
start "IrfanView" /wait %iview% input.png /crop=(0,901,150,150,0) /convert=107.png
start "IrfanView" /wait %iview% input.png /crop=(0,1051,150,150,0) /convert=108.png
start "IrfanView" /wait %iview% input.png /crop=(0,1201,150,150,0) /convert=109.png
start "IrfanView" /wait %iview% input.png /crop=(0,1351,150,150,0) /convert=110.png

start "IrfanView" /wait %iview% input.png /crop=(451,0,150,150,0) /convert=111.png
start "IrfanView" /wait %iview% input.png /crop=(451,151,150,150,0) /convert=112.png
start "IrfanView" /wait %iview% input.png /crop=(451,301,150,150,0) /convert=113.png
start "IrfanView" /wait %iview% input.png /crop=(451,451,150,150,0) /convert=114.png
start "IrfanView" /wait %iview% input.png /crop=(451,601,150,150,0) /convert=115.png
start "IrfanView" /wait %iview% input.png /crop=(451,751,150,150,0) /convert=116.png
start "IrfanView" /wait %iview% input.png /crop=(451,901,150,150,0) /convert=201.png
start "IrfanView" /wait %iview% input.png /crop=(451,1051,150,150,0) /convert=202.png
start "IrfanView" /wait %iview% input.png /crop=(451,1201,150,150,0) /convert=203.png
start "IrfanView" /wait %iview% input.png /crop=(451,1351,150,150,0) /convert=204.png

start "IrfanView" /wait %iview% input.png /crop=(901,0,150,150,0) /convert=205.png
start "IrfanView" /wait %iview% input.png /crop=(901,151,150,150,0) /convert=206.png
start "IrfanView" /wait %iview% input.png /crop=(901,301,150,150,0) /convert=207.png
start "IrfanView" /wait %iview% input.png /crop=(901,451,150,150,0) /convert=208.png
start "IrfanView" /wait %iview% input.png /crop=(901,601,150,150,0) /convert=209.png
start "IrfanView" /wait %iview% input.png /crop=(901,751,150,150,0) /convert=210.png
start "IrfanView" /wait %iview% input.png /crop=(901,901,150,150,0) /convert=301.png
start "IrfanView" /wait %iview% input.png /crop=(901,1051,150,150,0) /convert=302.png
start "IrfanView" /wait %iview% input.png /crop=(901,1201,150,150,0) /convert=303.png
start "IrfanView" /wait %iview% input.png /crop=(901,1351,150,150,0) /convert=304.png

start "IrfanView" /wait %iview% input.png /crop=(1351,0,150,150,0) /convert=305.png
start "IrfanView" /wait %iview% input.png /crop=(1351,151,150,150,0) /convert=306.png
start "IrfanView" /wait %iview% input.png /crop=(1351,301,150,150,0) /convert=307.png
start "IrfanView" /wait %iview% input.png /crop=(1351,451,150,150,0) /convert=308.png
start "IrfanView" /wait %iview% input.png /crop=(1351,601,150,150,0) /convert=309.png
start "IrfanView" /wait %iview% input.png /crop=(1351,751,150,150,0) /convert=310.png
start "IrfanView" /wait %iview% input.png /crop=(1351,901,150,150,0) /convert=311.png
start "IrfanView" /wait %iview% input.png /crop=(1351,1051,150,150,0) /convert=401.png
start "IrfanView" /wait %iview% input.png /crop=(1351,1201,150,150,0) /convert=402.png
start "IrfanView" /wait %iview% input.png /crop=(1351,1351,150,150,0) /convert=403.png

start "IrfanView" /wait %iview% input.png /crop=(1801,0,150,150,0) /convert=404.png
start "IrfanView" /wait %iview% input.png /crop=(1801,151,150,150,0) /convert=405.png
start "IrfanView" /wait %iview% input.png /crop=(1801,301,150,150,0) /convert=406.png
start "IrfanView" /wait %iview% input.png /crop=(1801,451,150,150,0) /convert=407.png
start "IrfanView" /wait %iview% input.png /crop=(1801,601,150,150,0) /convert=408.png
start "IrfanView" /wait %iview% input.png /crop=(1801,751,150,150,0) /convert=409.png
start "IrfanView" /wait %iview% input.png /crop=(1801,901,150,150,0) /convert=410.png
start "IrfanView" /wait %iview% input.png /crop=(1801,1051,150,150,0) /convert=501.png
start "IrfanView" /wait %iview% input.png /crop=(1801,1201,150,150,0) /convert=502.png
start "IrfanView" /wait %iview% input.png /crop=(1801,1351,150,150,0) /convert=503.png

start "IrfanView" /wait %iview% input.png /crop=(2251,0,150,150,0) /convert=504.png
start "IrfanView" /wait %iview% input.png /crop=(2251,151,150,150,0) /convert=505.png
start "IrfanView" /wait %iview% input.png /crop=(2251,301,150,150,0) /convert=506.png
start "IrfanView" /wait %iview% input.png /crop=(2251,451,150,150,0) /convert=507.png
start "IrfanView" /wait %iview% input.png /crop=(2251,601,150,150,0) /convert=508.png
start "IrfanView" /wait %iview% input.png /crop=(2251,751,150,150,0) /convert=509.png
start "IrfanView" /wait %iview% input.png /crop=(2251,901,150,150,0) /convert=510.png
start "IrfanView" /wait %iview% input.png /crop=(2251,1051,150,150,0) /convert=511.png
start "IrfanView" /wait %iview% input.png /crop=(2251,1201,150,150,0) /convert=512.png
start "IrfanView" /wait %iview% input.png /crop=(2251,1351,150,150,0) /convert=513.png

start "IrfanView" /wait %iview% input.png /crop=(2701,0,150,150,0) /convert=514.png
start "IrfanView" /wait %iview% input.png /crop=(2701,151,150,150,0) /convert=515.png
start "IrfanView" /wait %iview% input.png /crop=(2701,301,150,150,0) /convert=516.png
start "IrfanView" /wait %iview% input.png /crop=(2701,451,150,150,0) /convert=517.png
start "IrfanView" /wait %iview% input.png /crop=(2701,601,150,150,0) /convert=518.png
start "IrfanView" /wait %iview% input.png /crop=(2701,751,150,150,0) /convert=519.png
start "IrfanView" /wait %iview% input.png /crop=(2701,901,150,150,0) /convert=520.png
start "IrfanView" /wait %iview% input.png /crop=(2701,1051,150,150,0) /convert=521.png
start "IrfanView" /wait %iview% input.png /crop=(2701,1201,150,150,0) /convert=522.png
start "IrfanView" /wait %iview% input.png /crop=(2701,1351,150,150,0) /convert=523.png

start "IrfanView" /wait %iview% input.png /crop=(3151,0,150,150,0) /convert=598.png
start "IrfanView" /wait %iview% input.png /crop=(3151,151,150,150,0) /convert=599.png
start "IrfanView" /wait %iview% input.png /crop=(3151,301,150,150,0) /convert=900.png


goto end


rem IrfanView could not be found.
:noiview
echo IrfanView not found in the given path:
echo   %iview%
goto end

rem End of the script
:end
endlocal d of the script
:end
endlocal