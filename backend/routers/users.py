from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from schemas import Token
from models import User
from database import get_db
from crud import *
from crud import *

users_router = APIRouter(prefix='/users', tags=['Users'])


@users_router.post('/token', response_model=Token)
async def login_for_access_token(  
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
):
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password',
            headers={'WWW-Authenticate': 'Bearer'}
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={'sub': user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type='bearer')


async def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)],):
    return current_user


@users_router.get('users/me/items')
async def read_own_items(current_user: Annotated[User, Depends(get_current_active_user)],):
    return [{'itme_id': 'Foo', 'owner': current_user.username}]

            
@users_router.post('/register')
async def register(user_in: UserCreate, db:AsyncSession = Depends(get_db)):
    if await get_user(db, user_in.username):
        raise HTTPException(status_code=400, detail='Username уже занят')
    if await get_user_by_email(db, user_in.email):
        raise HTTPException(status_code=400, detail='Email уже зарегистрирован')
    
    user = await create_user(db, user_in)
    return user


