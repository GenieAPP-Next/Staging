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

### Find Group
- [GET] /api/findGroup/:userid

### Create Payment
- [POST] /api/createPayment

```json
{
    "billSplitId": 1,
    "amount": 150000,
    "paymentMethod": "example payment method",
    "confirmationStatus": false 
}
```
### Vote Gift
- [POST] /api/voteGift

```json
{
    "groupId": 29,
    "userId": 7,
    "giftId": 9
}
```
### Add Gift
- [POST] /api/addGift
```json
{
    "groupId": 31,
    "name": "example gift",
    "price": 1200000,
    "imageUrl": "example link image",
    "urlLink": "example link product",
    "userId": 8,
    "categoryId": 3
}
```
### Post SplitBill
- [POST] /api/:groupId/:giftId

### GET SplitBill
- [GET] /api/:groupId/userId
