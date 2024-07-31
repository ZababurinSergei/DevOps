// wfsoundapp.cpp: определяет точку входа для приложения.
//

#include "wfsoundapp.h"

struct CButtonFilter
{
	CFilter*	flt = 0;
};

struct CButtonFilter	g_fltButton;


App::App(HINSTANCE hInstance, int nCmdShow) : m_hInstance(hInstance), m_nCmdShow(nCmdShow)
{
	m_nWidth = 900;
	m_nHeight = 600;

	m_hRC = 0;
	m_hDC = 0;
	m_hWnd = 0;

	m_pCoreItems = 0;
	m_nCount = 0;
}

App::~App()
{

}

int App::Initialize(void* params)
{

	int nRes = 0;

	LoadString(m_hInstance, IDS_APP_TITLE, m_szTitle, MAX_LOADSTRING);
	LoadString(m_hInstance, IDC_GLSOUNDAPP, m_szWindowClass, MAX_LOADSTRING);

	WNDCLASSEX wcex;

	wcex.cbSize = sizeof(WNDCLASSEX);

	wcex.style = CS_HREDRAW | CS_VREDRAW;
	wcex.lpfnWndProc = ApplicationWndProc;
	wcex.cbClsExtra = 0;
	wcex.cbWndExtra = 0;
	wcex.hInstance = m_hInstance;
	wcex.hIcon = LoadIcon(m_hInstance, MAKEINTRESOURCE(IDI_GLSOUNDAPP));

	wcex.hCursor = LoadCursor(NULL, IDC_ARROW);
	wcex.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
	wcex.lpszMenuName = m_szWindowClass; // MAKEINTRESOURCE(IDC_GLSOUNDAPP);
	wcex.lpszClassName = m_szWindowClass;
	wcex.hIconSm = LoadIcon(wcex.hInstance, MAKEINTRESOURCE(IDI_SMALL));

	RegisterClassEx(&wcex);

	m_hWnd = CreateWindow(m_szWindowClass, m_szTitle, WS_OVERLAPPEDWINDOW | WS_CLIPSIBLINGS | WS_CLIPCHILDREN,
		CW_USEDEFAULT, 0, m_nWidth, m_nHeight, NULL, NULL, m_hInstance, NULL);

	SetWindowLong(m_hWnd, GWL_USERDATA, (LONG)this);

	if (!m_hWnd)
	{
		return 0;
	}

	ShowWindow(m_hWnd, m_nCmdShow);
	UpdateWindow(m_hWnd);

	m_hDC = GetDC(m_hWnd);

	PIXELFORMATDESCRIPTOR pfd, *ppfd;
	int pixelformat;

	ppfd = &pfd;

	ppfd->nSize = sizeof(PIXELFORMATDESCRIPTOR);
	ppfd->nVersion = 1;
	ppfd->dwFlags = PFD_DRAW_TO_WINDOW | PFD_SUPPORT_OPENGL | PFD_DOUBLEBUFFER;
	ppfd->dwLayerMask = PFD_MAIN_PLANE;
	ppfd->iPixelType = PFD_TYPE_COLORINDEX;
	ppfd->cColorBits = 8;
	ppfd->cDepthBits = 16;
	ppfd->cAccumBits = 0;
	ppfd->cStencilBits = 0;

	pixelformat = ChoosePixelFormat(m_hDC, ppfd);

	if ((pixelformat = ChoosePixelFormat(m_hDC, ppfd)) == 0)
	{
		MessageBox(NULL, "ChoosePixelFormat failed", "Error", MB_OK);
		return 0;
	}

	if (SetPixelFormat(m_hDC, pixelformat, ppfd) == FALSE)
	{
		MessageBox(NULL, "SetPixelFormat failed", "Error", MB_OK);
		return 0;
	}

	m_hRC = wglCreateContext(m_hDC);
	wglMakeCurrent(m_hDC, m_hRC);


	CSUIFilters* module = new CSUIFilters();
	
	if (module)
	{
		CFilter* flt = 0;
		CLine* line = 0;

		module->Initialize(this);


		g_fltButton.flt = CSUIFilters::wfCreateFilter(module, this);
		if (g_fltButton.flt)
		{
			g_fltButton.flt->GetInMS();
			g_fltButton.flt->SetInMS(1);
			g_fltButton.flt->SetOutMS(1);

			std::cout << "Wfsoundapp.cpp Line 124" << std::endl;
			getchar();
		}

		InsertToQueue(module);
	}

	return 1;
}

unsigned int App::InsertToQueue(CCoreWave* item)
{
	if (item)
	{
		m_pCoreItems = (CCoreWave**)realloc(m_pCoreItems, (m_nCount + 1) * sizeof(CCoreWave*));
		if (m_pCoreItems)
		{
			m_pCoreItems[m_nCount] = item;
			m_nCount++;
		}
	}
	return m_nCount;
}

void App::RemoveFromQueue(CCoreWave* item)
{
	if (item)
	{
		for (unsigned int i = 0; i < m_nCount; i++)
		{
			if (m_pCoreItems[i] == item)
			{
				m_nCount--;
				for (unsigned int j = i; j < m_nCount; j++)
				{
					m_pCoreItems[j] = m_pCoreItems[j + 1];
				}
				m_pCoreItems = (CCoreWave**)realloc(m_pCoreItems, m_nCount * sizeof(CCoreWave*));
				break;
			}
		}
	}
}
LRESULT CALLBACK App::ApplicationWndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{
	PAINTSTRUCT ps;
	HDC hdc;

	App* theApp = (App*)GetWindowLong(hWnd, GWL_USERDATA);

	static BOOL fInWindow;

	TRACKMOUSEEVENT tme;

	tme.cbSize = sizeof(tme);
	tme.hwndTrack = hWnd;
	tme.dwHoverTime = 1;

	switch (message)
	{
	case WM_PAINT:
		hdc = BeginPaint(hWnd, &ps);
		EndPaint(hWnd, &ps);
		break;
	case WM_CLOSE:
		PostQuitMessage(0);
		break;
	case WM_SIZE:
		theApp->Events(theApp, message, wParam, lParam); //OnResize(rect.right - rect.left, rect.bottom - rect.left);
		break;
	case WM_KEYDOWN:
		theApp->Events(theApp, message, wParam, lParam);
		break;
	case WM_MOUSEWHEEL:
		theApp->Events(theApp, message, wParam, lParam); //OnMouseWhell(GET_KEYSTATE_WPARAM(wParam), GET_WHEEL_DELTA_WPARAM(wParam), GET_X_LPARAM(lParam), GET_Y_LPARAM(lParam));
		break;
	case WM_RBUTTONUP:
	case WM_RBUTTONDOWN:
	case WM_RBUTTONDBLCLK:
	case WM_LBUTTONUP:
	case WM_LBUTTONDOWN:
	case WM_LBUTTONDBLCLK:
	case WM_MBUTTONUP:
	case WM_MBUTTONDOWN:
	case WM_MBUTTONDBLCLK:
		theApp->Events(theApp, message, wParam, lParam); //OnMButtonDblclk(wParam, GET_X_LPARAM(lParam), GET_Y_LPARAM(lParam));
		break;
	case WM_MOUSELEAVE:
		if (fInWindow)
		{
			fInWindow = FALSE;
			theApp->Events(theApp, message, wParam, lParam); //OnMouseMove(0, point.x, point.y);
		}
		break;
	case WM_MOUSEHOVER:
		if (!fInWindow)
		{
			fInWindow = TRUE;
			theApp->Events(theApp, message, wParam, lParam);
		}
		break;
	case WM_MOUSEMOVE:
		tme.dwFlags = TME_LEAVE | TME_HOVER;
		TrackMouseEvent(&tme);

		theApp->Events(theApp, message, wParam, lParam); //OnMouseMove(wParam, GET_X_LPARAM(lParam), GET_Y_LPARAM(lParam));
		break;
	case WM_ERASEBKGND:
		return TRUE;
		break;
	case WM_TIMER:
		if (wParam == WM_USER + 1)
			theApp->Play();
		break;
	default:
		return DefWindowProc(hWnd, message, wParam, lParam);
	}
	return 0;
}
void App::FreeQueue()
{
	if (m_pCoreItems)
	{
		free(m_pCoreItems);
	}
}

int App::Run()
{
	MSG msg;

	SetTimer(m_hWnd, WM_USER + 1, 0, NULL);

	while (GetMessage(&msg, NULL, 0, 0))
	{
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}

	KillTimer(m_hWnd, WM_USER + 1);

	return (int)msg.wParam;
}

void App::Events(CCoreWave* wave, UINT message, WPARAM wparam, LPARAM lparam)
{

}

void App::OnResize(int nWidth, int nHeight)
{
	m_nWidth = nWidth;
	m_nHeight = nHeight;
	//glViewport(0, 0, nWidth, nHeight);
}

void App::Terminate()
{

}

void App::Play()
{


}