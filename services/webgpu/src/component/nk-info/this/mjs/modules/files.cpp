#include "files.h"
IOBusObject g_BusObjects[] = {
	{ "bus_in_1", nullptr },
	{ "bus_in_2", nullptr },
	{ "bus_in_3", nullptr },
	{ "bus_in_4", nullptr },
	{ "bus_in_5", nullptr },
	{ "bus_in_6", nullptr },
	{ "bus_in_7", nullptr },
	{ "bus_in_8", nullptr },

	{ "bus_out_1", nullptr },
	{ "bus_out_2", nullptr },
	{ "bus_out_3", nullptr },
	{ "bus_out_4", nullptr },
	{ "bus_out_5", nullptr },
	{ "bus_out_6", nullptr },
	{ "bus_out_7", nullptr },
	{ "bus_out_8", nullptr },
	{ "", nullptr }
};

void CFiles::ProcessWaveFile(WaveFormat &fmt, float** buffers, size_t len, void* ptrParam)
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

}

IOFile* CFiles::LoadFile(Application* app)
{
	OPENFILENAME ofn;       // common dialog box structure
	char szFile[260];       // buffer for file name

	ZeroMemory(&ofn, sizeof(OPENFILENAME));
	ofn.lStructSize = sizeof(OPENFILENAME);
	ofn.hwndOwner = app->m_hWnd;
	ofn.lpstrFile = szFile;
	ofn.lpstrFile[0] = '\0';
	ofn.nMaxFile = sizeof(szFile);
	ofn.lpstrFilter = "All files\0*.*\0Wave files\0*.wav\0";
	ofn.nFilterIndex = 2;
	ofn.lpstrFileTitle = NULL;
	ofn.nMaxFileTitle = 0;
	ofn.lpstrInitialDir = NULL;
	ofn.Flags = OFN_PATHMUSTEXIST | OFN_FILEMUSTEXIST;


	if (GetOpenFileName(&ofn) == TRUE)
	{

		if (app)
		{
			IOFile* wfbuf = app->m_pIOObject->m_files.create_file(ofn.lpstrFile);

			WaveFile		wfile;
			WaveFormat&		wformat = wfbuf->m_pWaveFormat;
			WaveBuffer*		&wbuf = wfbuf->m_pWaveBuffer;

			if (wfile.Open(wformat, ofn.lpstrFile, WAVE_READ))
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

				return wfbuf;
			}
		}
	}

	return 0;
}

void CFiles::SaveFile(Application* app)
{

	/*
//	WaveFileBuffer* wfbuf = new WaveFileBuffer();

	WaveFile&			wfile = *app->m_pWaveFile;
	//WaveFormat&		wformat = wfbuf->m_pWaveFormat;
	//WaveBuffer*		&wbuf = wfbuf->m_pWaveBuffer;


	TCHAR szFilters[] = _T("Scribble Files (*.wav)\0*.wav\0\0");
	TCHAR szFilePathName[_MAX_PATH] = _T("");
	OPENFILENAME ofn = { 0 };

	ofn.lStructSize = sizeof(OPENFILENAME);
	ofn.hwndOwner = app->m_hWnd;
	ofn.lpstrFilter = szFilters;
	ofn.lpstrFile = szFilePathName;  // This will hold the file name
	ofn.lpstrDefExt = _T("wav");
	ofn.nMaxFile = _MAX_PATH;
	ofn.lpstrTitle = _T("Save File");
	ofn.Flags = OFN_OVERWRITEPROMPT;

	// Open the file save dialog, and choose the file name

	if (GetSaveFileName(&ofn) == TRUE)
	{
		if (app)
		{
			//wformat.nChannels = 1;
			//wformat.nSamplePerSec = 44100;
			//wformat.wBitsPerSample = 16;
			//wformat.wFormatTag = 1;

			if (wfile.Open(wformat, "00_01_temp.wav", WAVE_WRITE))
			{
				if (wfile.Write(wformat, &wbuf, (wbuf->wlen)))
					std::cout << "Write file success" << std::endl;
				else
					std::cout << "Write file failed" << std::endl;
				wfile.Close();
			}
		}
	}
	*/
}

void CFiles::Terminate()
{

}

int CFiles::Initialize(void* params)
{
	return 1;
}
