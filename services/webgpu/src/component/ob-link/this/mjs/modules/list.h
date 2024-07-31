

#ifndef PLAY_L_H
#define PLAY_L_H

#include <iostream>  
#include "struct.h"


class LIST
{
public:
	LIST();

	~LIST();

	PLAYLIST* play_list = 0;
	int list_amount = 0;
	int yes_or_not = 0;

	PLAYLIST* AddStruct(PLAYLIST* Obj, int  list_amount);

	void setData(PLAYLIST* Obj, int  list_amount);
	void set_list(int* list_amount);
	void get(PLAYLIST* list_in, int list_amount);

	void get(PLAYLIST* list_in, int list_amount,int select);
	void get(WRITELIST *write_list);
	void get(DISPLAYLIST *display_list);

private:

};



#endif 
