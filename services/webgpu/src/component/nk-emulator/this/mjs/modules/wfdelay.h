#ifndef _WFDELAY_H_
#define _WFDELAY_H_

#include <windows.h>

#include <stdlib.h>
#include <string>
#include <malloc.h>
#include <memory.h>
#include <tchar.h>

#include <math.h>

#include "wfwave.h"
#include "wfsoundapp.h"

class CSUIFilters;

class CDelay : public CCoreWave
{
public:
	CDelay();
	virtual ~CDelay();

	void			Play();
	int				Initialize(void* param);
	void			Terminate();

protected:

	CSUIFilters*	m_pParent;
};


#endif //_WFDELAY_H_