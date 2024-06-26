#ifndef _WAVEQUEUE_H
#define _WAVEQUEUE_H

#include "wavebuffer.h"
#include "waveformat.h"

class WaveQueue
{
public:
	WaveQueue();
	virtual ~WaveQueue();

	void Open(WaveFormat& fmt, int nChannels);
	void Close();
	void Play(WaveBuffer* wbuf, unsigned int nOffset, int nLen);

	static void CALLBACK waveOutProc(HWAVEOUT hwo, UINT uMsg, DWORD dwInstance, DWORD dwParam1, DWORD dwParam2);
	WAVEHDR m_wh;
	HWAVEOUT m_wo;
	WAVEFORMATEX wformatex;

	unsigned int		m_nOffset;
	size_t				m_nLen;
	bool				m_bPlay;
};


#endif // _WAVEQUEUE_H