#ifndef WAVEPROCESS_H
#define WAVEPROCESS_H

#include <iostream>
#include <iomanip>

#include <windows.h>

#include <stdlib.h>
#include <malloc.h>
#include <memory.h>
#include <tchar.h>

#include "glsoundapp.h"
#include "glbase.h"
#include "wavebuffer.h"

class Application;

class WaveProcess : public CSystemBase
{
public:

	WaveProcess();
	virtual ~WaveProcess();

	int				Initialize(void* param);
	void			Terminate();

	Application*	m_pApplication;


	static void		ProcessWaveFile(CCoreBase* base, float** buffers, size_t len, void* param);


	void Process(char* name);

};

#endif
