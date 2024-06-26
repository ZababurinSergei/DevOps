#ifndef STRUCT_H
#define STRUCT_H

#include <windows.h>



const int read_size = 1;
const int display_size = 10;
const int write_size = 10; // количетсво диапазонов



struct WAVPARAM{

	int	  			wchannels;
	int	  			i_w;
	int	  			j_w;
	int	  			wlen;
	double			dval;

};

struct BufferParam{

	double*			pBuffer;
	COLORREF		color;
	size_t			size;

};


struct PLAYLIST {
	char	name_file[32];
	int  	num_chanal;
};

struct WRITELIST   // структура памяти
{
	int b_range[write_size][2];      // диапазоны вывода
};

struct DISPLAYLIST   // структура памяти
{
	int b_range[display_size][3];      // диапазоны вывода
};

struct SPECTRUM    // структура цвета 16 бит   
{
	int black = RGB(0, 0, 0);
	int white = RGB(255, 255, 255);
	int red = RGB(255, 0, 0);
	int blue = RGB(0, 0, 255);
	int orange = RGB(255, 102, 51);
	int yellow = RGB(255, 255, 0);
	int green = RGB(0, 128, 0);
	int purple = RGB(153, 0, 204);
	int grey = RGB(102, 102, 102);
	int pink = RGB(255, 0, 204);
};

#endif