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
- [POST] /API/createPayment

```json
{
    "billSplitId": 1 (example bill_split_id),
    "amount": 150000 (example_amount),
    "paymentMethod": "example payment method",
    "confirmationStatus": false (true or false)
}
```
