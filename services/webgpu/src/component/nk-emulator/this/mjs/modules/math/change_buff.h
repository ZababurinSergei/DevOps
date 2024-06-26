#ifndef __CHANGE_BUFF_H__
#define __CHANGE_BUFF_H__


class CHANGE_BUFF
{
public:
		double *read; 
		double *write; 
		double *in; 
		double *out;  

		int w_size;  
		int size; 
		int* random;  
		int count;
		int count2;

		void init();
		void go_read();
		void go_write();
};


#endif 