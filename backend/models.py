from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    disabled = Column(Boolean, default=False)

    posts = relationship("Blog", back_populates="author")


class Blog(Base):
    __tablename__ = 'blog'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    image_path = Column(String, nullable=True)

    author_id = Column(Integer, ForeignKey('users.id'))
    
    author = relationship('User', back_populates='posts')
    comments = relationship('Comment', back_populates='blog', cascade="all, delete")
    
    
class Comment(Base):
    __tablename__ = 'comment'

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, index=True)
    post_id = Column(Integer, ForeignKey('blog.id'))

    blog = relationship('Blog', back_populates='comments')
