#ifndef _WFSOUNDAPP_H_
#define _WFSOUNDAPP_H_

#include <windows.h>
#include <Windowsx.h>

#include <stdlib.h>
#include <iostream>
#include <malloc.h>
#include <memory.h>
#include <tchar.h>
#include <time.h>

#include "resource.h"
#include "wfwave.h"

#include "suifiltersmodule.h"

#define MAX_LOADSTRING 100

class App : public CCoreWave
{
public:
	App(HINSTANCE hInstance, int nCmdShow);
	virtual	~App();

	int				Initialize(void* params);
	void			Terminate();
	void			Play();
	int				Run();

	unsigned int	InsertToQueue(CCoreWave* item);
	void			RemoveFromQueue(CCoreWave* item);
	void			FreeQueue();

	void			Events(CCoreWave* wave, UINT message, WPARAM wparam, LPARAM lparam);

	static LRESULT CALLBACK ApplicationWndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam);
	
	int				m_nHeight;
	int				m_nWidth;

	TCHAR			m_szTitle[MAX_LOADSTRING];
	TCHAR			m_szWindowClass[MAX_LOADSTRING];

	HINSTANCE		m_hInstance;
	int				m_nCmdShow;
	HWND			m_hWnd;

	unsigned int	m_nCount;
	CCoreWave**		m_pCoreItems;

	void			OnResize(int nWidth, int nHeight);

protected:

	//TCHAR			m_szTitle[MAX_LOADSTRING];
	//TCHAR			m_szWindowClass[MAX_LOADSTRING];

public:

	HDC				m_hDC;
	HGLRC			m_hRC;
};

#endif //_WFSOUNDAPP_H_