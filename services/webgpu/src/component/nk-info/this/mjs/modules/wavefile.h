#ifndef WAVEFILE_H
#define WAVEFILE_H

#include "windows.h"
#include "stdio.h"
#include "math.h"
#include "waveformat.h"

#define WAVE_READ  0x00
#define WAVE_WRITE 0x01

class WaveFile
{
public:
	WaveFile();
	virtual ~WaveFile();

	int Open(WaveFormat& fmt, char* szFileName, int nType);
	int Process(WaveFormat& fmt, void(*Callback)(WaveFormat &fmt, float** pBuffers, size_t len, void* ptrParam), int nBlocks, void* ptrParam);
	int ReadBuffer(WaveFormat& fmt, float** ptr, size_t& len, int nBlocks);
	int FreeBuffer(WaveFormat& fmt, float** ptr);
	int Write(WaveFormat& fmt, float** pBuffers, int nBlocks);

	void Close();

protected:
	void Decode(unsigned short wFormatTag, unsigned short nBlockAlign, unsigned short nChannels, unsigned char* szBuffer, float**szBufferData, size_t nBlocks);

	int Read(unsigned char* szBuffer, int nSize);
	int ReadChunkValue(unsigned char* szBuffer, int nSize);
	int ReadChunk(unsigned char* chunk, WaveFormat& fmt);

	int Write(unsigned char* szBuffer, int nSize);
	int WriteChunkValue(unsigned char* szBuffer, int nSize);
	int WriteChunk(unsigned char* chunk, WaveFormat& fmt);

	short short32_be_read(unsigned char* cptr);
	short short32_le_read(unsigned char* cptr);
	void short32_be_write(short in, unsigned char *out);
	void short32_le_write(short in, unsigned char *out);

	float float32_be_read(unsigned char *cptr);
	float float32_le_read(unsigned char *cptr);
	void float32_be_write(float in, unsigned char *out);
	void float32_le_write(float in, unsigned char *out);

	unsigned int	m_dwSampleLength;
	unsigned int	m_cksizeData;

    bool			m_bBE;
    FILE*			m_hFile;
};

#endif