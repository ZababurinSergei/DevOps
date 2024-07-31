#include "wavebuffer.h"

WaveBuffer*	WaveBuffer::walloc(int nChannels)
{
	WaveBuffer* wbuf = new WaveBuffer();

	wbuf->wlen = 0;
	wbuf->wchannels = nChannels;

	wbuf->wbuffers = (float**)malloc(wbuf->wchannels * sizeof(float*));
	for (int i = 0; i < wbuf->wchannels; i++)
		wbuf->wbuffers[i] = 0;

	return wbuf;
}

void WaveBuffer::wfree(WaveBuffer* wbuf)
{
	for (int i = 0; i < wbuf->wchannels; i++)
	{
		if (wbuf->wbuffers[i])
		{
			free(wbuf->wbuffers[i]);
			wbuf->wbuffers[i] = 0;
		}
	}
	if (wbuf->wbuffers)
	{
		free(wbuf->wbuffers);
		wbuf->wbuffers = 0;
	}

	delete wbuf;
}

void WaveBuffer::wballoc(WaveBuffer* wbuf, int size)
{
	if (wbuf)
	{
		for (int i = 0; i < wbuf->wchannels; i++)
		{
			wbuf->wbuffers[i] = (float*)malloc( size * sizeof(float) );
		}
		wbuf->wlen = size;
	}
}

void WaveBuffer::wbrealloc(WaveBuffer* wbuf, int size)
{
	if (wbuf)
	{
		for (int i = 0; i < wbuf->wchannels; i++)
		{
			wbuf->wbuffers[i] = (float*)realloc(wbuf->wbuffers[i], size * sizeof(float));
		}
		wbuf->wlen = size;
	}
}

void WaveBuffer::wbfree(WaveBuffer* wbuf)
{
	if ( wbuf )
	{
		for (int i = 0; i < wbuf->wchannels; i++)
		{
			free(wbuf->wbuffers[i]);
		}
	}
}
