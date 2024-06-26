#include "waveprocess.h"

WaveProcess::WaveProcess()
{
}

WaveProcess::~WaveProcess()
{
}

int WaveProcess::Initialize(void* params)
{
	m_pApplication = (Application*)params;
	return 1;
}

void WaveProcess::Terminate()
{
}

void WaveProcess::Process(char* name)
{
	WaveFile&		wfile = m_pApplication->m_WaveFile;
	WaveFormat&		wformat = m_pApplication->m_WaveFormat;
	WaveBuffer*		wbuf = 0;

	if (wfile.Open(wformat, name, WAVE_READ))
	{
		std::cout << "nChannels: " << wformat.nChannels << std::endl;
		std::cout << "nBlockAlign: " << wformat.nBlockAlign << std::endl;
		std::cout << "nSamplePerSec: " << wformat.nSamplePerSec << std::endl;
		std::cout << "wBitsPerSample: " << wformat.wBitsPerSample << std::endl;
		std::cout << "nAvgBytesPerSec: " << wformat.nAvgBytesPerSec << std::endl;
		std::cout << "wFormatTag: " << wformat.wFormatTag << std::endl;
		std::cout << std::endl;

		wbuf = WaveBuffer::walloc(wformat.nChannels);

		if (wfile.Process(wformat, ProcessWaveFile, 512, (void*)wbuf))
			std::cout << "Read file success" << std::endl;
		else
			std::cout << "Read file failed" << std::endl;

		wfile.Close();
	}

	wformat.nChannels = 1;
	wformat.nSamplePerSec = 44100;
	wformat.wBitsPerSample = 16;
	wformat.wFormatTag = 1;


	if (wfile.Open(wformat, "00_01_temp.wav", WAVE_WRITE))
	{
		if (wfile.Write(wformat, &filter.graph_00, (wbuf->wlen)))
			std::cout << "Write file success" << std::endl;
		else
			std::cout << "Write file failed" << std::endl;
		wfile.Close();
	}
};

void WaveProcess::ProcessWaveFile(WaveFormat &fmt, float** buffers, size_t len, void* ptrParam)
{
	WaveBuffer* loop = (WaveBuffer*)ptrParam;
	loop->wlen += len;

	for (int i = 0; i < fmt.nChannels; i++)
	{

		loop->wbuffers[i] = (float*)realloc(loop->wbuffers[i], loop->wlen*sizeof(float));
		for (int j = 0; j < len; j++)
		{
			double dval = buffers[i][j];

			loop->wbuffers[i][loop->wlen - len + j] = dval;
		}
	}
};
