1. Delete initiative
����������� ��� ������ PollAccessor.java

2. Persistent session 
����������� ��� ���� 3� �����.

3. "Encrypting" Password
The password is only hashed before sent to the server. We found a third-party library and we use an md5 hashing 
before sending the password in the ajax requests. For this implementation we had to remove back-end Regular expression
checks.