import {
    BadRequestException,
    NotFoundException,
    ConflictException,
  } from '@nestjs/common';
  
  export const badRequestException = new BadRequestException();
  
  export const ExistlocationError = new ConflictException('location already exist');
  export const notFoundLocationIdException = new NotFoundException('locationId is not founded'); 
  
 