#include "change_buff.h"
#include "functions.h"

void CHANGE_BUFF::init(){ 
	size = w_size*2;
	read = new double[size];	
	write = new double[size];	
	set_0(read, size);
	set_0(write, size);
	count = 0;
	count2 = 0;
};

void CHANGE_BUFF::go_read(){
	if(*random < size && *random > 0){
		for (int i = 0; i < *random; i++){     
			if(count < size){  
				read[count] = in[i];
				count++;
			}else if(count >= size){
				count = 0;
				read[0] = in[i];
				count++;
			}
		};
	};
};

void CHANGE_BUFF::go_write(){
	if(*random < size && *random > 0){
		for (int i = 0; i < *random; i++){     
			if(count2 < size){  
				out[i] = write[count2];
				count2++;
			}else if(count2 >= size){
				count2 = 0;
				out[i] = write[0];
				count2++;
			};
		};
	};
};

