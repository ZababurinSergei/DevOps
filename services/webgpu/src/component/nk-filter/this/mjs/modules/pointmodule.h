#ifndef _POINT_H_MODULE_H_
#define _POINT_H_MODULE_H_

#include <windows.h>

#include <stdlib.h>
#include <malloc.h>
#include <memory.h>
#include <tchar.h>

#include <GL/glew.h>
#include <GL/wglew.h>
#include <GL/gl.h> 
#include <GL/glu.h> 

#include "glbase.h"
#include "glsoundapp.h"

class Application;

class PointModule : public Base
{
public:
	PointModule();
	virtual ~PointModule();

	virtual int		Initialize(void* params);
	virtual void	Terminate();
	virtual void	Draw();

	Application*	m_pApplication;

	void			SetBuffer(GLfloat* b, GLsizeiptr s, GLfloat* c);

	GLfloat*		GetBuffer();

protected:

	GLsizeiptr		size;
	GLfloat*		buffer;
	GLfloat*		color;

	GLuint			vbohandles[1];

};

#endif //_GridModule_H_