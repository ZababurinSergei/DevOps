#ifndef _FILES_H_
#define _FILES_H_

#include <stdlib.h>
#include <windows.h>
#include <Windowsx.h>
#include <string>
#include <iostream>
#include "glbase.h"
#include "wavefile.h"
#include "wavebuffer.h"
#include "filter.h"
#include "glsoundapp.h"
#include "iofile.h"

class Application;

class CFiles : CSystemBase
{
public:

	int					Initialize(void* params);
	void				Terminate();
	static void			ProcessWaveFile(WaveFormat &fmt, float** buffers, size_t len, void* ptrParam);
	IOFile*				LoadFile(Application* app);
	void				SaveFile(Application* app);

protected:

};

#endif //_FILES_H_