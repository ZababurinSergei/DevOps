#include "wavequeue.h"
#include "wavebuffer.h"

#include <windows.h>
#include "Mmreg.h"

#pragma comment(lib, "Winmm.lib")

WaveQueue::WaveQueue(){}

WaveQueue::~WaveQueue(){}

void WaveQueue::Open(WaveFormat& fmt, int nChannels)
{

	MMRESULT err;

	ZeroMemory(&wformatex, sizeof(WAVEFORMATEX));
	wformatex.wFormatTag = WAVE_FORMAT_PCM;
	wformatex.nChannels = nChannels;
	wformatex.nSamplesPerSec = fmt.nSamplePerSec;
	wformatex.wBitsPerSample = fmt.wBitsPerSample;
	wformatex.nBlockAlign = (fmt.nChannels * fmt.wBitsPerSample) / 8;
	wformatex.nAvgBytesPerSec = wformatex.nSamplesPerSec * wformatex.nBlockAlign;
	wformatex.cbSize = 0;

	err = waveOutOpen(&m_wo, WAVE_MAPPER, &wformatex,
		(DWORD_PTR)waveOutProc, (DWORD)this,
		CALLBACK_FUNCTION);


}
void WaveQueue::Close()
{
	MMRESULT err;

	
	err = waveOutClose(m_wo);

	
}
void WaveQueue::Play(WaveBuffer* wbuf, unsigned int nOffset, int nLen)
{

	
	MMRESULT err;

	m_bPlay = false;

	ULONG bsize = wformatex.nBlockAlign * nLen;
	m_wh.lpData = (LPSTR)malloc(bsize);
	m_wh.dwBufferLength = bsize;
	m_wh.dwBytesRecorded = 0;
	m_wh.dwFlags = 0;
	m_wh.dwLoops = 0;
	m_wh.dwUser = 0;
	m_wh.lpNext = 0;
	m_wh.reserved = 0;



	unsigned int idx = 0;
	for (int i = nOffset; i < nOffset + nLen; i++)
	{
		for (int j = 0; j < wbuf->wchannels; j++)
		{
			unsigned short ax = (unsigned short)((float)wbuf->wbuffers[j][i] * 32767.0f);
			unsigned char* dx = (unsigned char*)&ax;

			m_wh.lpData[idx + 0] = dx[0];
			m_wh.lpData[idx + 1] = dx[1];

			idx = idx + 2;
		}
	}
	
	err = waveOutPrepareHeader(m_wo, &m_wh, sizeof(WAVEHDR));

	m_bPlay = true;
	err = waveOutWrite(m_wo, &m_wh, sizeof(WAVEHDR));

	while (m_bPlay);

	err = waveOutUnprepareHeader(m_wo, &m_wh, sizeof(WAVEHDR));
	free(m_wh.lpData);


	
}

void CALLBACK WaveQueue::waveOutProc(HWAVEOUT hwo, UINT uMsg, DWORD dwInstance, DWORD dwParam1, DWORD dwParam2)
{
	MMRESULT mmRes;
	WaveQueue *pPW = (WaveQueue*)dwInstance;
	switch (uMsg)
	{
	case MM_WOM_DONE:       //playback finished
		pPW->m_bPlay = false;

		
		break;
	}

}