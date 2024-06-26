#ifndef _WFHILBERT_H_
#define _WFHILBERT_H_

#include <windows.h>

#include <stdlib.h>
#include <string>
#include <malloc.h>
#include <memory.h>
#include <tchar.h>

#define _USE_MATH_DEFINES 
#include <math.h>

#include "wfwave.h"
#include "wfsoundapp.h"

class CSUIFilters;

class CHilbert : public CCoreWave
{
public:
	CHilbert();
	virtual ~CHilbert();

	void			Play();
	int				Initialize(void* param);
	void			Terminate();

protected:

	CSUIFilters*	m_pParent;
};


#endif //_wfHilbert_H_