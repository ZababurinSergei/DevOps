#ifndef __CORE_H__
#define __CORE_H__

#include "change_buff.h"  
#include "line_function.h"   
//#include <hilbert.h>  
//#include <osc.h> 

class CORE
{ 
public:
		int buff_size;  
		int parallel_size; 

		CHANGE_BUFF *change_buff;
		DELAY *delay; 
		LINE_FUNCTION *line_function;

		int* random; 
		int w_size;
		double* buff;  

		double count;
		bool trigger;

		void init();
		void loop(double* in_L, double* in_R, double* out_L, double* out_R);
}; 


#endif 