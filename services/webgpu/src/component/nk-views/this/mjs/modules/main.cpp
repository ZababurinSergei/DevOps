#include <windows.h>
#include "glsoundapp.h"

/*
int WINAPI WinMain(HINSTANCE hInstance,
	HINSTANCE hPrevInstance,
	LPSTR lpCmdLine,
	int nCmdShow)
{

	Application app(hInstance, nCmdShow);
	int nRes = 0;

	if (app.Initialize(nullptr))
		nRes = app.Run();

	app.Terminate();
	return nRes;

}
*/

int main()
{
	HINSTANCE hInstance = GetModuleHandle(NULL);
	int nCmdShow = SW_SHOW;

	Application app(hInstance, nCmdShow);
	int nRes = 0;

	if (app.Initialize(nullptr))
		nRes = app.Run();

	app.Terminate();
	return nRes;

}
