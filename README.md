
git init 
git add README.md 
git commit -m "first commit" 

### Setup SSH keys

git remote add acme-corp git@github.com:cloudseeder/acme-corp.git 
git remote set-url --push acme-corp git@github.com:cloudseeder/acme-corp.git 
git push 
