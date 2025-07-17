import os
import uuid
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form   
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

import models
from models import Blog, User
from database import get_db
from schemas import BlogOut
from crud import get_current_active_user, get_current_user

blog_router = APIRouter(prefix='/blogs', tags=['Blogs'])

UPLOAD_DIR = 'media'

@blog_router.get('/', response_model=List[BlogOut])
async def get_blogs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Blog))
    blogs = result.scalars().all()
    return blogs
    

@blog_router.post('/create-blog')
async def create_blog(title: str = Form(...), content: str = Form(...),author_id: int = Form(...),image: UploadFile = File(None),db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    image_path = None
    if image:
        filename = f'{uuid.uuid4().hex}_{image.filename}'
        image_path = os.path.join(UPLOAD_DIR, filename)
        with open(image_path, 'wb') as buffer:
            shutil.copyfileobj(image.file, buffer)
    
    new_post = models.Blog(
        title=title,
        content=content,
        author_id=current_user.id,
        image_path=image_path
    )
    db.add(new_post)
    await db.commit()
    await db.refresh(new_post)
    return {'detail': 'Post created', 'post_if': new_post.id}


@blog_router.post('/add-comment')
async def add_comment_for_comment(content: str = Form(...),post_id: int = Form(...), db: AsyncSession = Depends(get_db)):
    
    add_comment = models.Comment(
        content=content,
        post_id=post_id,
    )
    
    db.add(add_comment)
    await db.commit()
    await db.refresh(add_comment)
    return {'detail': 'Comment created', 'comment_if': add_comment.id}


@blog_router.get("/check-token")
async def check_token(current_user: User = Depends(get_current_user)):
    return {"username": current_user.username}
