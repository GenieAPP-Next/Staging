# Genie, RevoU NEXT Project

## Routes

### Register

- /api/auth/register

```json
{
  "username": "example",
  "email": "example@email.com",
  "password": "example123"
}
```
### Creategroup

- [POST] /api/createGroup

```json
{
    "name": "example-name-group",
    "category": "example-category",
    "eventDate": "example-eventData",
    "creatorUserId": 4
}
```
### Addmember
- [POST] /api/addMember

```json
{
    "groupId": 7,
    "userId": 5,
    "role": "example-role"
}
```
### findMember
- [GET] /api/findMember/:username

### listMember
- [GET] /api/listMember/:groupid
