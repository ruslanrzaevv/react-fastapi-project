from pydantic import BaseModel


class BlogBase(BaseModel):
    title: str
    content: str


class BlogCreate(BaseModel):
    title: str
    content: str
    author: str
    author_id: int


class BlogOut(BaseModel):
    id: int
    author_id: int
    title: str
    content: str
    image_path: str | None

    class Config:
        orm_mode = True
        
        
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username : str | None = None


class User(BaseModel):
    username : str
    email : str | None = None
    fullname : str | None = None 
    disabled : bool | None = None


class UserInDB(User):
    hashed_password : str  
    

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    disabled: bool

    class Config:
        orm_mode = True     


class UserCreate(BaseModel):
    username: str 
    email: str
    password: str 
    

    