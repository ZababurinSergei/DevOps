#include "wavefile.h"

WaveFile::WaveFile()
{
	unsigned short x = 1; /* 0x0001 */
	m_bBE = *((unsigned char *)&x) == 0 ? true : false;
}

WaveFile::~WaveFile()
{

}

int WaveFile::Open(WaveFormat& fmt, char* szFileName, int nType)
{
	int nRes = -1;
	m_dwSampleLength = 0;

	if (nType == WAVE_READ)
	{
		m_hFile = fopen(szFileName, "rb");
		if (m_hFile > 0)
		{
			unsigned char ckID[4];

			if (Read(ckID, 4) > -1)
			{
				unsigned int cksize = 0;
				unsigned char waveID[4];

				if (strncmp((char*)ckID, "RIFF", 4) == 0)
				{
					if (ReadChunkValue((unsigned char*)&cksize, 4) > -1)
					{
						if (Read(waveID, 4) > -1)
						{
							if (strncmp((char*)waveID, "WAVE", 4) == 0)
							{
								while (true)
								{
									if (Read(ckID, 4) > -1)
									{
										nRes = ReadChunk(ckID, fmt);
										if (nRes == -1) break;
										else if (nRes == 1) break;
									}
									else
									{
										nRes = -1;
										break;
									}
								}
							}
							else
							{
								nRes = -1;
							}
						}
						else
						{
							nRes = -1;
						}
					}
					else
					{
						nRes = -1;
					}
				}
				else
				{
					nRes = -1;
				}
			}
			else
			{
				nRes = -1;
			}
		}
		else
		{
			nRes = -2;
		}
	}
	else if (nType == WAVE_WRITE)
	{
		m_hFile = fopen(szFileName,"wb+");
		if (m_hFile)
		{
			unsigned char ckID[4] = {'R','I','F','F'};
			if (Write(ckID, 4) > -1)
			{
				nRes = 1;
			}
			else
			{
				nRes = -1;
			}
		}
		else
		{
			nRes = -2;
		}
	}
	if (nRes == -1) Close();
	return nRes;
}

int WaveFile::Write(WaveFormat& fmt, float** pBuffers, int nBlocks)
{
	unsigned int cksize = 0;
	unsigned char ckID[4];
	int nRes = 1;

	

	if (fmt.wFormatTag == 1)
	{
		if (fmt.wBitsPerSample > 8)
		{
			cksize = 36 + nBlocks * fmt.nChannels * 2;
			fmt.nAvgBytesPerSec = fmt.nSamplePerSec * fmt.nChannels * 2;
			fmt.nBlockAlign = fmt.nChannels * 2;
			m_cksizeData = nBlocks * fmt.nChannels * 2;
		}
		else if (fmt.wBitsPerSample == 8)
		{
			cksize = 36 + nBlocks * fmt.nChannels * 1;
			fmt.nAvgBytesPerSec = fmt.nSamplePerSec * fmt.nChannels * 1;
			fmt.nBlockAlign = fmt.nChannels * 1;
			m_cksizeData = nBlocks * fmt.nChannels * 1;
		}
		else
		{
			return -1;
		}
	}
	else if (fmt.wFormatTag == 3)
	{
		if (fmt.wBitsPerSample > 8)
		{
			cksize = 36 + nBlocks * fmt.nChannels * 4;
			fmt.nAvgBytesPerSec = fmt.nSamplePerSec * fmt.nChannels * 4;
			fmt.nBlockAlign = fmt.nChannels * 4;
			m_cksizeData = nBlocks * fmt.nChannels * 4;
		}
		else
		{
			return -1;
		}
	}
	
	unsigned short nOffset = fmt.nBlockAlign / fmt.nChannels;

	if(WriteChunkValue((unsigned char*)&cksize, 4)==-1) return -1;

	memcpy(ckID, "WAVE", 4);
	if(Write(ckID, 4) == -1) return -1;

	memcpy(ckID, "fmt ", 4);
	if (Write(ckID, 4) == -1) return -1;

	cksize = 16;
	if (WriteChunkValue((unsigned char*)&cksize, 4) == -1) return -1;
	if (WriteChunkValue((unsigned char*)&fmt.wFormatTag, 2) == -1) return -1;
	if (WriteChunkValue((unsigned char*)&fmt.nChannels, 2) == -1) return -1;
	if (WriteChunkValue((unsigned char*)&fmt.nSamplePerSec, 4) == -1) return -1;
	if (WriteChunkValue((unsigned char*)&fmt.nAvgBytesPerSec, 4) == -1) return -1;
	if (WriteChunkValue((unsigned char*)&fmt.nBlockAlign, 2) == -1) return -1;
	if (WriteChunkValue((unsigned char*)&fmt.wBitsPerSample, 2) == -1) return -1;

	memcpy(ckID, "data", 4);
	if (Write(ckID, 4) == -1) return -1;

	if (WriteChunkValue((unsigned char*)&m_cksizeData, 4) == -1) return -1;

	unsigned char * tmp = (unsigned char*)malloc(m_cksizeData);
	if (tmp)
	{
		for (int i = 0; i < nBlocks; i++)
		{
			for (int j = 0; j < fmt.nChannels; j++)
			{
				double fval = pBuffers[j][i];
				if (fmt.wFormatTag == 1)
				{
					if (nOffset == 1)
					{
						unsigned char ax[1];

						ax[1] = (unsigned char)(((float)fval * 255.0f) / 2.0f + 127.0f);
						memcpy(tmp + (i + j) * 1, ax, 1);
					}
					else if (nOffset == 2)
					{
						unsigned char ax[2];

						if (m_bBE)
							short32_be_write((short)((float)fval * 32767.0f), ax);
						else
							short32_le_write((short)((float)fval * 32767.0f), ax);

						memcpy(tmp + (i*fmt.nBlockAlign + j*nOffset), ax, 2);
					}
				}
				else if (fmt.wFormatTag == 3)
				{
					if (nOffset == 4)
					{
						unsigned char ax[4];

						if (m_bBE)
							float32_be_write((float)fval, ax);
						else
							float32_le_write((float)fval, ax);

						memcpy(tmp + (i*fmt.nBlockAlign + j*nOffset), ax, 4);
					}
				}
			}

		}

		if (Write(tmp, m_cksizeData) == -1) nRes = -1;
		free(tmp);
	}

	return nRes;
}

int WaveFile::ReadBuffer(WaveFormat& fmt, float** ptr, size_t &len, int nBlocks)
{
	int nRes = 1;

	size_t size = fmt.nBlockAlign*nBlocks;
	unsigned char* tmp = (unsigned char*)malloc(size);
	if (tmp)
	{
		float ** buffers = new float*[fmt.nChannels];
		for (int i = 0; i < fmt.nChannels; i++)
		{
			buffers[i] = new float[nBlocks];
		}
		if (!feof(m_hFile))
		{
			memset(tmp, 0, size);
			for (int i = 0; i < fmt.nChannels; i++)
			{
				for (int j = 0; j < nBlocks; j++)
					buffers[i][j] = 0.0;
			}
			size_t nRead = fread(tmp, 1, size, m_hFile);
			if (nRead != size)
			{
				int nError = ferror(m_hFile);
				if (nError > 0)
				{
					FreeBuffer(fmt, buffers);
					return -1;
				}
			}
			Decode(fmt.wFormatTag, fmt.nBlockAlign, fmt.nChannels, tmp, buffers, nBlocks);
			ptr = buffers;
			len = nRead / fmt.nBlockAlign;
		}
		free(tmp);
	}
	return 1;
}

int WaveFile::FreeBuffer(WaveFormat& fmt, float** ptr)
{
	for (int i = 0; i < fmt.nChannels; i++)
	{
		delete[] ptr[i];
	}

	delete[]ptr;
	return 0;
}

int WaveFile::Process(WaveFormat& fmt, void(*Callback)(WaveFormat &fmt, float** pBuffers, size_t len, void* ptrParam), int nBlocks, void* ptrParam)
{
	int nRes = 1;

	size_t size = fmt.nBlockAlign*nBlocks;
	unsigned char* tmp = (unsigned char*)malloc(size);
	if (tmp)
	{
		float ** buffers = new float*[fmt.nChannels];
		for (int i = 0; i < fmt.nChannels; i++)
		{
			buffers[i] = new float[nBlocks];
		}
		while (!feof(m_hFile))
		{
			memset(tmp, 0, size);
			for (int i = 0; i < fmt.nChannels; i++)
			{
				for (int j = 0; j < nBlocks; j++)
					buffers[i][j] = 0.0;
			}
			size_t nRead = fread(tmp, 1, size, m_hFile);
			if (nRead != size)
			{
				int nError = ferror(m_hFile);
				if (nError > 0)
				{
					nRes = -1;
					break;
				}
			}
			Decode(fmt.wFormatTag, fmt.nBlockAlign, fmt.nChannels, tmp, buffers, nBlocks);
			Callback(fmt, buffers, nRead / fmt.nBlockAlign, ptrParam);
		}

		for (int i = 0; i < fmt.nChannels; i++)
		{
			delete[] buffers[i];
		}

		delete[]buffers;
		free(tmp);
	}
	return nRes;
}

void WaveFile::Decode(unsigned short wFormatTag, unsigned short nBlockAlign, unsigned short nChannels, unsigned char* pBuffer, float**szBufferData, size_t nBlocks)
{
	unsigned short nOffset = nBlockAlign / nChannels;

	for (unsigned int i = 0; i < nBlocks; i++)
	{
		for (unsigned int j = 0; j < nChannels; j++)
		{
			if (wFormatTag == 0x0001)
			{
				if (nOffset == 1)
				{
					unsigned char ax = pBuffer[(i + j)*1];
					szBufferData[j][i] = (float)ax / (float)255.0;
				}
				else if (nOffset == 2)
				{
					short ax = 0;


					if (m_bBE)
						ax = short32_be_read(pBuffer + (i*nBlockAlign + j*nOffset));
					else
						ax = short32_le_read(pBuffer + (i*nBlockAlign + j*nOffset));

					szBufferData[j][i] = (float)ax / (float)32767.0;
				}
			}
			else if (wFormatTag == 0x0003)
			{
				if (nOffset == 4)
				{
					float ax = 0.0f;

					if (m_bBE)
						ax = float32_be_read(pBuffer + (i*nBlockAlign + j*nOffset));
					else
						ax = float32_le_read(pBuffer + (i*nBlockAlign + j*nOffset));

					szBufferData[j][i] = (float)ax;
				}
			}

		}
	}
}

int WaveFile::Read(unsigned char* szBuffer, int nSize)
{
	size_t size = fread(szBuffer, 1, nSize, m_hFile);
	if (size != nSize)
		return -1;
	return size;
}

int WaveFile::ReadChunkValue(unsigned char* szBuffer, int nSize)
{
	unsigned char *tmp = (unsigned char*)malloc(nSize);
	int nRes = Read(tmp, nSize);
	if (nRes == -1)
	{
		free(tmp);
		return -1;
	}
	if (m_bBE)
	{
		for (int i = 0; i < nSize; i++)
			szBuffer[nSize - i - 1] = tmp[i];
	}
	else
	{
		for (int i = 0; i < nSize; i++)
			szBuffer[i] = tmp[i];
	}
	free(tmp);
	return nRes;
}

int WaveFile::ReadChunk(unsigned char* chunk, WaveFormat& fmt)
{
	int nRes = -1;
	unsigned int cksize = 0;

	if (strncmp((char*)chunk, "fmt ", 4) == 0)
	{
		if (ReadChunkValue((unsigned char*)&cksize, 4) == -1) return -1;
		if (cksize != 16) return -1;
		if (ReadChunkValue((unsigned char*)&fmt.wFormatTag, 2) == -1) return -1;
		if (ReadChunkValue((unsigned char*)&fmt.nChannels, 2) == -1) return -1;
		if (ReadChunkValue((unsigned char*)&fmt.nSamplePerSec, 4) == -1) return -1;
		if (ReadChunkValue((unsigned char*)&fmt.nAvgBytesPerSec, 4) == -1) return -1;
		if (ReadChunkValue((unsigned char*)&fmt.nBlockAlign, 2) == -1) return -1;
		if (ReadChunkValue((unsigned char*)&fmt.wBitsPerSample, 2) == -1) return -1;

		nRes = 0;
	}
	else if (strncmp((char*)chunk, "fact", 4) == 0)
	{
		if (ReadChunkValue((unsigned char*)&cksize, 4) == -1) return -1;
		if (cksize == 4)
		{
			if (ReadChunkValue((unsigned char*)&m_dwSampleLength, 4) == -1) return -1;
		}
		else
		{
			unsigned char* tmp = (unsigned char*)malloc(cksize);
			if (tmp)
			{
				if (Read(tmp, cksize) == -1)
				{
					free(tmp);
					return -1;
				}
				free(tmp);
			}
		}

		nRes = 0;
	}
	else if (strncmp((char*)chunk, "data", 4) == 0)
	{
		if (ReadChunkValue((unsigned char*)&m_cksizeData, 4) == -1) return -1;
		if (m_dwSampleLength == 0)
		{
			m_dwSampleLength = m_cksizeData / fmt.nChannels;
			m_dwSampleLength = m_dwSampleLength / fmt.nBlockAlign;
		}
		nRes = 1;
	}
	else
	{
		if (ReadChunkValue((unsigned char*)&cksize, 4) == -1) return -1;
		unsigned char* tmp = (unsigned char*)malloc(cksize);
		if (tmp)
		{
			if (Read(tmp, cksize) == -1)
			{
				free(tmp);
				return -1;
			}
			free(tmp);
		}

		nRes = 0;
	}

	return nRes;
}

int WaveFile::Write(unsigned char* szBuffer, int nSize)
{
	size_t size = fwrite(szBuffer, 1, nSize, m_hFile);
	if (size != nSize)
		return -1;
	return size;
}

int WaveFile::WriteChunkValue(unsigned char* szBuffer, int nSize)
{
	unsigned char *tmp = (unsigned char*)malloc(nSize);
	if (m_bBE)
	{
		for (int i = 0; i < nSize; i++)
			tmp[i] = szBuffer[nSize - i - 1];
	}
	else
	{
		for (int i = 0; i < nSize; i++)
			tmp[i] = szBuffer[i];
	}
	int nRes = Write(tmp, nSize);
	if (nRes == -1)
	{
		free(tmp);
		return -1;
	}

	free(tmp);
	return nRes;
}

int WaveFile::WriteChunk(unsigned char* chunk, WaveFormat& fmt)
{
	return 0;
}

short WaveFile::short32_be_read(unsigned char* cptr)
{
	short result = 0;
	unsigned char ic = 0;

	ic = cptr[0];
	result |= ((unsigned short)ic << 8);
	ic = cptr[1];
	result |= ic;

	return result;
}

short WaveFile::short32_le_read(unsigned char* cptr)
{
	short result = 0;
	unsigned char ic = 0;

	ic = cptr[0];
	result = ic;
	ic = cptr[1];
	result |= ((unsigned short)ic << 8);

	return result;
}

void WaveFile::short32_be_write(short in, unsigned char *out)
{
	memset(out, 0, sizeof(short));
	
	out[1] = in & 0xff;
	out[0] = (in & 0xff00) >> 8;
}

void WaveFile::short32_le_write(short in, unsigned char *out)
{
	memset(out, 0, sizeof(short));

	out[0] = in & 0xff;
	out[1] = (in & 0xff00) >> 8;
}

float WaveFile::float32_be_read(unsigned char *cptr)
{
	int		exponent, mantissa, negative;
	float	fvalue;

	negative = cptr[0] & 0x80;
	exponent = ((cptr[0] & 0x7F) << 1) | ((cptr[1] & 0x80) ? 1 : 0);
	mantissa = ((cptr[1] & 0x7F) << 16) | (cptr[2] << 8) | (cptr[3]);

	if (!(exponent || mantissa))
		return 0.0;

	mantissa |= 0x800000;
	exponent = exponent ? exponent - 127 : 0;

	fvalue = (float)mantissa ? ((float)mantissa) / ((float)0x800000) : 0.0f;

	if (negative)
		fvalue *= -1;

	if (exponent > 0)
		fvalue *= powf(2.0f, (float)exponent);
	else if (exponent < 0)
		fvalue /= powf(2.0f, (float)abs(exponent));

	return fvalue;
} /* float32_be_read */

float WaveFile::float32_le_read(unsigned char *cptr)
{
	int		exponent, mantissa, negative;
	float	fvalue;

	negative = cptr[3] & 0x80;
	exponent = ((cptr[3] & 0x7F) << 1) | ((cptr[2] & 0x80) ? 1 : 0);
	mantissa = ((cptr[2] & 0x7F) << 16) | (cptr[1] << 8) | (cptr[0]);

	if (!(exponent || mantissa))
		return 0.0;

	mantissa |= 0x800000;
	exponent = exponent ? exponent - 127 : 0;

	fvalue = (float)mantissa ? ((float)mantissa) / ((float)0x800000) : 0.0f;

	if (negative)
		fvalue *= -1;

	if (exponent > 0)
		fvalue *= powf(2.0f, (float)exponent);
	else if (exponent < 0)
		fvalue /= powf(2.0f, (float)abs(exponent));

	return fvalue;
} /* float32_le_read */

void WaveFile::float32_le_write(float in, unsigned char *out)
{
	int		exponent, mantissa, negative = 0;

	memset(out, 0, sizeof(int));

	if (fabs(in) < 1e-30)
		return;

	if (in < 0.0)
	{
		in *= -1.0;
		negative = 1;
	};

	in = frexp(in, &exponent);

	exponent += 126;

	in *= (float)0x1000000;
	mantissa = (((int)in) & 0x7FFFFF);

	if (negative)
		out[3] |= 0x80;

	if (exponent & 0x01)
		out[2] |= 0x80;

	out[0] = mantissa & 0xFF;
	out[1] = (mantissa >> 8) & 0xFF;
	out[2] |= (mantissa >> 16) & 0x7F;
	out[3] |= (exponent >> 1) & 0x7F;

	return;
} /* float32_le_write */

void WaveFile::float32_be_write(float in, unsigned char *out)
{
	int		exponent, mantissa, negative = 0;

	memset(out, 0, sizeof(int));

	if (fabs(in) < 1e-30)
		return;

	if (in < 0.0)
	{
		in *= -1.0;
		negative = 1;
	};

	in = frexp(in, &exponent);

	exponent += 126;

	in *= (float)0x1000000;
	mantissa = (((int)in) & 0x7FFFFF);

	if (negative)
		out[0] |= 0x80;

	if (exponent & 0x01)
		out[1] |= 0x80;

	out[3] = mantissa & 0xFF;
	out[2] = (mantissa >> 8) & 0xFF;
	out[1] |= (mantissa >> 16) & 0x7F;
	out[0] |= (exponent >> 1) & 0x7F;

	return;
} /* float32_be_write */

void WaveFile::Close()
{
	if (m_hFile)
	{
		fclose(m_hFile);
		m_hFile = 0;
	}
}