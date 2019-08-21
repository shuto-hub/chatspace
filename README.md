#ChatSpace README


##usersテーブル


|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|mail_address|string|null: false, foreign_key: true|
|password|string|null: false|
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :groups, through: :groups_users

##messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

##groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|group_name|string|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :users, through: :groups_users
- belongs_to :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

