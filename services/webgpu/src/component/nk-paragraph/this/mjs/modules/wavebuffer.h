#ifndef _WAVEBUFFER_H
#define _WAVEBUFFER_H

#include <stdlib.h>
#include <windows.h>
#include <Windowsx.h>
#include <string>
#include <iostream>


class WaveBuffer
{
public:

	float **		wbuffers;
	int				wlen;
	int				wchannels;

	static WaveBuffer*	walloc(int nChannels);
	static void			wfree(WaveBuffer* wbuf);

	static void			wballoc(WaveBuffer* wbuf, int size);
	static void			wbrealloc(WaveBuffer* wbuf, int size);
	static void			wbfree(WaveBuffer* wbuf);
};

#endif //_WAVEBUFFER_H