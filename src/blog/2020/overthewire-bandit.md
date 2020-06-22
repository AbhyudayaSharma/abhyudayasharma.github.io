Over the past month, I was able to complete my first Capture-the-Flag challenge (outside Call of Duty), [OverTheWire Bandit](https://overthewire.org/wargames/bandit/).
If you haven't tried it out yet, I highly recommend doing it. It will be a great learning experience. You'll
get to learn about `ssh`, the shell, networks, Base64, Linux, `git` and much more. I have been programming and playing
around with them for a quite a few years, yet these challenges made me think about how they can create vulnerabilities
in our systems and scripts. The challenges force you to think out of the box and everything you need to know is present
in man pages. I wrote these solutions targeting beginners who haven't used these things before, and for my future
reference. If you find a better solution, please send me a hint.

Before you start scrolling down, please try to complete the challenges yourself. Once you're done, see if there was another way to
solve it. This challenge is only for your learning. Use the internet wisely - please don't Google for `overthewire bandit
solutions`. You will find countless other solutions, but please don't go through them. You'll learn more if you discover
things yourself. Please note that the passwords and private keys were correct at the time of writing and may change in
the future.

### Bandit 0

Password: `bandit0`

This is the first challenge. The only thing you need to complete this is `ssh`.
If you're on macOS or Linux or any BSD, `ssh` will likely be pre-installed. On
Windows, `ssh` is an optional feature. Follow the [docs](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse)
and install the SSH Client. Now, open your terminal and run `ssh`:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Note three things here: the username is `bandit0`, the host is `bandit.labs.overthewire.org`
and ssh is exposed to the internet at port `2220`. Once you're in the server, use `ls` to list files in the home
directory of `bandit0`. You'll see that there is a file called `readme`. `cat` the file to get the password to the
next level.

### Bandit 1

Password: `boJ9jbbUNNfktd78OOpsqOltutMc3MY1`

The filename is `-`. I tried `cat -`  which didn't work because `-` is a special flag in `cat` to
read from standard input (see [`man cat`](https://linux.die.net/man/1/cat)). So, we need
to either pass the absolute path to the file to `cat` (current directory can be found using `pwd`), or
we can use `cat ./-`. This is quite an interesting observation. We should always use `./*` when
globbing, or we could inadvertently set some flag in a command.

### Bandit 2

Password: `CV1DtqXWVFXTvM2F0k09SHz0YwRINYA9`

This one is super easy. The filename is `spaces in this filename`.
Type `sp` and hit the TAB key. `bash` will complete the filename for you. If you notice, the file name becomes
`spaces\ in\ this\ filename` where `\` is used to [escape](https://en.wikipedia.org/wiki/Escape_character) the space character.
If you're looking for a more general solution, `cat 'spaces in this filename'`
does the trick. This is again interesting. If you have the path to a file in a variable,
when using the variable, use quotes to avoid interpolation, handle spaces and avoid shell
globbing. For example: `FOO='spaces in the filename'; cat $FOO` doesn't work; `cat "$FOO"`
does.

### Bandit 3

Password: `UmHadQclWmgdLOKQ3YNgjWxGoRMb5luK`

In UNIX-like operating systems, files that start with `.` are hidden. To list hidden
files, use `ls` with `-a` flag. Read `ls --help` to know more.

### Bandit 4

Password: `pIwrPrtPN36QITSp3EQaw936yaFoFgAB`

The challenge description is enough to solve this problem. One by one, `cat` all the files
in the directory. `reset` your shell if it is messed up. The content of the only file that doesn't contain
gibberish is the password to the next level. Since the files start with `-`, remember to use what you learnt in
Bandit 2.

### Bandit 5

Password `koReBOKuIDDepwhWk7jZC0RTdopnAYKh`

For this level, you'll need to use `find`. [`man find`](https://linux.die.net/man/1/find) contains
all you need for completing this challenge.

```bash
find inhere/ -size 1033c -type f '!' -executable -exec cat '{}' +
```

The command searches for files that satisfy all of these criteria:
*   non-executable — `'!' -executable`
*   size = $1033$ bytes — `-size 1033c`
*   regular files (not directories) — `-type f`

Then it `cat`s each of these files using `-exec cat '{}' +`.

### Bandit 6

Password: `DXjZPULLxYr17uwoI01bNLQbtFemEgo7`

Again we need to use `find`, however we start at root because we don't know the location
of the file. Searching from root makes sure we visit all directories and files for
which we have the permissions. Note that `find` uses depth-first search.

```bash
find / -size 33c -user bandit7 -group bandit6 -exec cat '{}' +
```

The flags here are self-explanatory and easy to understand. There will be
files and directories where you won't have the permission to read. However,
there will be one file whose contents look like the passwords we have had.
That is the password to the next level.

### Bandit 7

Password: `HKBPTKQnIay4Fw76bEy8PVxKEDQRKTzs`

We will now use one of the best tools ever, `grep`.

```bash
grep millionth data.txt
```

`grep` can search for [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) in a list of files and
prints out their occurrences. Again, `man grep` is the best way to learn about grep.

### Bandit 8

Password: `cvX2JJa4CFALtqS87jk27qwqGhBM9plV`

This was a weird one. I had never used `uniq` before and wondered why it didn't work.
I found the solution in [`man uniq`](https://linux.die.net/man/1/uniq) (emphasis mine):

> Filter *adjacent* matching lines from INPUT (or standard input), writing to OUTPUT (or standard output).

So, sorting strings is necessary for `uniq` to work.

```bash
sort data.txt | uniq -u
```

The `-u` flag makes `uniq` print only unique strings. So the command above gives the
password to the next level.

### Bandit 9

Password: `UsvVyFSfZZWbi6wgC7dAFyFuR6jQQUhR`

For this challenge, we use `strings` which prints out all human readable strings of a file.
We can combine this with `grep` to get the password.

```bash
strings data.txt | grep -E '=+'
```

The `-E` flag is necessary to enable extended regular expressions in `grep`. The expression`=+` searches for lines
that contain one or more `=`s. This will give a few false positives, but you'll still be easily able to figure out
the password to the next level.

### Bandit 10

Password: `truKLdjsbJ5g7yyJ2X2R0o3a5HQJFuLk`

You can use `base64 -d data.txt` to decode the file. This will give you the password.

### Bandit 11

Password: `IFukwKGsFW8MOq3IRFqrxE1hxTNEbUPR`

This challenges uses ROT13 to encrypt contents of the file. This is a simple Caesar cipher.
So, we can use `tr`.

```bash
tr 'a-zA-Z' 'n-za-mN-ZA-M' < ./data.txt
```

This causes letters in the range `a-z` to be mapped to the characters `n-z` and `a-m` respectively. We do the same
for capital letters. This causes a $13$ place shift, equivalent to the ROT13 cipher. This will give you the password.
An interesting thing to note here is that applying ROT13 twice on any string English string will return the string
itself. This happens because the English alphabet contains $26$ characters.

### Bandit 12

Password: `5Te8Y4drgCRfCx8ugdwuEX8KFC6k2EUu`

This one is not so easy. If you don't understand any of the commands, look up its man page.

To begin with, follow the instructions in the prompt and create a temporary directory. You
can use `mktemp -d` to create one for you. Now, we first need to convert the hexdump to a usable format. We can use
`cut` to extract columns $2$ to $9$ (delimited by spaces) and then use `xxd` to convert the hexdump back to binary.
From the raw hexdump, we see that the first two bytes are `0x1f8b`. Time to check Wikipedia's [list of magic numbers](https://en.wikipedia.org/wiki/List_of_file_signatures).
Therefore, the file is gzipped. We can use `gzip -d` to decompress it. Take the dump using `xxd` and see what we get.

```bash
cut -d ' ' -f2-9 data.txt | xxd -p -r | gzip -d | xxd
```

This time, the first three bytes are `0x425a68` and therefore the file is Bzip2 compressed (interestingly if you
interpret the first three bytes as ASCII, you get `BZh`)Use `bz2 -d` to uncompress. The obtained file is gzipped this
time. Decompressing and `xxd` dumping it, we now get some valid ASCII text. Particularly, `data5.bin` and `0000644`
stand out. `0000644` is the UNIX file permission `rw-r--r--`. This looks like a [tarball](https://en.wikipedia.org/wiki/Tar_(computing)).

```bash
cut -d ' ' -f2-9 data.txt | xxd -p -r | gzip -d | bzip2 -d | tar -zx
```

This creates a new file `data5.bin`. This is another uncompressed tarball. `tar -xf data5.bin` creates another file,
`data6.bin`. This is another BZip2 compressed file. Doing `bzip2 -d data6.bin | xxd`, we find that the dump is another
tarball. So, we can do `tar -xjf data6.bin` and we now get `data8.bin`. This is another gzipped file. We can now `zcat`
this file to get the solution.

To summarize, the solution to this challenge was:

```bash
DIR=$(mktemp -d)
cd "$DIR" || exit 1
cp ~/data.txt .
cut -d ' ' -f2-9 data.txt | xxd -p -r | gzip -d | bzip2 -d | tar -zx
tar -xf data5.bin
tar -xjf data6.bin
zcat data8.bin
```

### Bandit 13

Password: `8ZjyCRiBWFYkneahHwxCv3wb2a1ORpYL`

To log into `bandit14`, you must use the private key in the home directory. Now, you can get the password of `bandit14`
from `/etc/bandit_pass/bandit14`. Or, we could do everything in one line:

```bash
ssh bandit14@localhost -i ./sshkey.private 'cat /etc/bandit_pass/bandit14'
```

This one-liner will login as `bandit14` and run `cat /etc/bandit_pass/bandit14`, giving you the password to the next level.

### Bandit 14

Password:  `4wcYUJFw0k0XLShlDzztnTBHiqxU3b3e`

Read the links in the question prompt. This is a simple challenge (if you understand [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)).
Simply `telnet localhost 30000` and paste the password to get the password for the next level.

### Bandit 15

Password: `BfMYroe26WYalil77FoDi9qh59eK5xNr`

This challenge encrypts the data sent over TCP using TLSv1.2. You can still use `telnet` but will need to perform `ECDHE-RSA-AES256-GCM-SHA384`
calculations manually and read and write binary. Looks complicated? It is, but OpenSSL's `s_client` does it all for you.

Run `openssl s_client -connect localhost:30001` and paste the password of this level. You will get the password to
the next level.

### Bandit 16

Password: `cluFn7wTiGryunymYOu4RcffSxQluehd`

`nmap` is an amazing tool which you can use to find open ports and what services are running on them. (You can even
detect what OS is running on those devices!)

```bash
nmap -A -p31000-32000 localhost
```

You'll get a list of open ports. See the `SERVICE` column. The ones using SSL will be marked clearly. One of the
services will be `ssl/unknown`. Connect to the corresponding port using OpenSSL's `s_client` like in Bandit 15.
This will give you a private key which you can use to log into the next level.

### Bandit 17

Private key: [download](https://gist.github.com/AbhyudayaSharma/51600f6cda75ee2396341d35498279dd)

After you've logged in as `bandit17`, use `diff` to find the differences between the two files.

```bash
git diff passwords.old passwords.new
```

I'm using `git-diff` because I think it looks better (and has syntax highlighting in my blog), but you can do the same
thing with `diff`. The newly added line is the password to the next level.

```diff
diff --git a/passwords.old b/passwords.new
index ce82611..b63678b 100644
--- a/passwords.old
+++ b/passwords.new
@@ -39,7 +39,7 @@ GwlKel7OwVXQG9FqIQntI0BAHea0IWBD
 LlomcOUT6d7lA2cJrYhCEhCChKCPrRao
-w0Yfolrc5bwjS4qw5mq1nnQi6mF03bii
+kfBf3eYk5BPBRzwjqutbbfE887SVc5Yd
 TVzFbgWpqUPE4fwAJPCz4rT7GemAZUjz
```

### Bandit 18

Password: `kfBf3eYk5BPBRzwjqutbbfE887SVc5Yd`

This is very easy. We have already used this technique in Bandit 13.

```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220 'cat ~/readme'
```

### Bandit 19

Password: `IueksS7Ubh8G3DCwVzrTd8rAVOwq3M5x`

Read the Wikipedia article to learn more about `setuid`. Then, run the given binary to get the password.

```bash
./bandit20-do cat /etc/bandit_pass/bandit20
```

### Bandit 20

Password: `GbKksEFF4yrVs6il55v6gwY5aVje5f0j`

To complete this challenge, you need to run your own `netcat` to listen to the requests. The given binary connects
to the `netcat` daemon on a provided port. Once connected, paste the password in the `netcat` session to get the password.

Run `nc -t -l -p 50000 localhost` in one tab of your terminal. Here I'm using $50000$ as a random port. If someone else
is using that port, try something else. Note that the maximum port number is $2^{16} - 1 = 65535$, and your applications
cannot bind to ports $\lt 1024$ without superuser permissions. In another tab, run `./suconnect 50000`. Follow the
instructions above to get the password to the next level in your `nc` session.

**Note**: Don't use `nc -C`, the binary doesn't work with CRLF.

### Bandit 21

Password: `gE269g2h3mw3pwgrj0Ha9Uoqen1c9DGr`

If you've never heard about cron before, cron is a UNIX utility which runs scripts and commands at specific times or
after specified intervals. Look at `/etc/cron.d/cronjob_bandit22` because we need to become Bandit 22 for accessing the
next level. The cron string is `* * * * * /usr/bin/cronjob_bandit22.sh`, which means that `/usr/bin/cronjob_bandit22.sh`
will be executed every minute. `cat`ing `/usr/bin/cronjob_bandit22.sh`, we find that the password for `bandit22` gets
written to `/tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv`. Also, everyone gets read permissions to the file.
We can therefore `cat` this file to get the password to the next level.

### Bandit 22

Password: `Yk7owGAcWjwMVRwrTesJEwB7WVOiILLI`

This is another cron-based challenge. Like in Bandit 21, find and `cat` the script that runs every minute.

```bash
#!/bin/bash
myname=$(whoami)
mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)
echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"
cat /etc/bandit_pass/$myname > /tmp/$mytarget
```

The challenge now becomes to find the value of `$mytarget`. The file `/tmp/$mytarget` contains the password to the next
level. Since this cronjob is run as `bandit23`, `myname='bandit23'`. You can easily find `$mytarget` by running the
following command:

```bash
mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)
```

### Bandit 23

Password: `jc1udXuA1tiHqjIsL8yaapX5XIAI6i0n`

This time around, the cron job executes files owned by `bandit23` from `/var/spool/bandit24` and runs them as `bandit24`.
You will need a temporary directory to safely keep your shell scripts because the scripts in `/var/spool/bandit24` are
deleted after execution. To write the file, you can use `nano` as it is very simple to use. Then copy this bash file to
`/var/spool/bandit24` where `$DIR` is your temporary directory:

```bash
#!/bin/bash

cat /etc/bandit_pass/bandit24 > "$DIR/log" 2>&1
chown bandit23 "$DIR/log"
```

Note that `chown`ing the file is necessary because the cron job runs as `bandit24`. The files created will also be
owned by `bandit24` and `bandit23` will not have read permissions.

Wait for a few seconds for the cron job to fire after which the `log` file in the temp directory will contain the password.

### Bandit 24

Password: `UoMYTrfrBFHyQXmg6gzctqAwOmw1IohZ`

We need to brute force our way to next challenge. I used Python's `telnetlib` to interact with the server, but you
can do it in any programming language of your choice.

```python
#!/usr/bin/env python3

from telnetlib import Telnet

PASS = b'UoMYTrfrBFHyQXmg6gzctqAwOmw1IohZ'

telnet = Telnet()
telnet.open('localhost', 30002)
telnet.read_until(b'\n')  # ignore first line

for i in range(10000):
    telnet.write(PASS + b' ' + bytes(str(i).zfill(4), 'us-ascii') + b'\n')
    data = telnet.read_until(b'\n')
    if data != b'Wrong! Please enter the correct pincode. Try again.\n':
        print(i, data)
        print(telnet.read_all())
        break
    if i % 100 == 0:
        print('Currently at:', i)
```

Take care that the passcode is 4-digit. So numbers like `25` need to be padded with `0`s to obtain `0025`.
Run this script and wait for a few minutes until you get the password to the next level.

### Bandit 25

Password: `uNG9O58gUE7snukf3bvZ0rxhtnjzSGzG`

This was really hard. I tried `export MORE='--d -1'` to make more always use a line size of $1$ but that didn't work,
possibly because `sshd` was not configured to accept the variable `MORE`. Resizing the terminal window so that it
displays just one line did work. I got a hint by running `ssh` with `-vvv`. Whenever the terminal size changes, the
`ssh` client sends a terminal size changed signal to the server. Once `more` is paused, hit the `v` key to start `vim`.
Then set the `shell` option using `set shell=/bin/bash`. Then, run a command from inside `vim` like you would otherwise.
`:!/bin/bash`. Boom, you get a shell. Make sure you allocate a pseudo-tty by setting the `-t` flag in `ssh`. Then, we
can easily `cat` the password in `/etc/bandit_pass/bandit26`. The thing to note here is that `more` should never be used
in a shell script, otherwise the user can perform arbitrary code injection.

### Bandit 26

Password: `5czgV9L3Xx8JPOyRbXh6lQbmIOWvPT6Z`

Once you have the shell from Bandit 26, run the following command to get the password. This challenge is another example
of `setuid`.

```bash
./bandit27-do cat /etc/bandit_pass/bandit27
```

### Bandit 27

Password: `3ba3118a22e93127a4ed485be72ef5ea`

This challenge is quite easy. You just need to know how to clone a repository. You will need a temporary directory to
clone into.

```bash
git clone ssh://bandit27-git@localhost/home/bandit27-git/repo
cd repo
cat README
```

### Bandit 28

Password: `0ef186ac70e04ea33b4c1853d2526fa2`

This time around the password is in git history and has not been purged. Take a look at `git log` which provides the
commit history.

```text
commit edd935d60906b33f0619605abd1689808ccdd5ee
Author: Morla Porla <morla@overthewire.org>
Date: Thu May 7 20:14:49 2020 +0200

fix info leak
```

Our task is simple now. Run `git diff edd93^ edd93` to see the changes made in commit `edd93^`.

```diff
diff --git a/README.md b/README.md
index 3f7cee8..5c6457b 100644
--- a/README.md
+++ b/README.md
@@ -4,5 +4,5 @@ Some notes for level29 of bandit.
## credentials

- username: bandit29
-- password: bbc96594b4e001778eee9975372716b2
+- password: xxxxxxxxxx
```

### Bandit 29

Password: `bbc96594b4e001778eee9975372716b2`

This time around the file says:

```md
- username: bandit30
- password: <no passwords in production!>
```

That's a strong hint that the file is not in the master branch. List out the branches using `git branch -r`.

```bash
bandit0@bandit:/tmp/tmp.f10V7X91LW/repo$ git branch -r
  origin/HEAD -> origin/master
  origin/dev
  origin/master
  origin/sploits-dev
```

The `dev` branch looks interesting. `git checkout dev && cat README.md`

```markdown
# Bandit Notes
Some notes for bandit30 of bandit.

## credentials

- username: bandit30
- password: 5b90576bedb2cc04c86a9e924ce42faf
```

There's the password.

### Bandit 30

Password: `5b90576bedb2cc04c86a9e924ce42faf`

The `README` in this challenge doesn't actually contain any useful information. `git ls-files` shows that it is in fact
the only file in the master branch. `git branch -r` confirms that there are no other branches. The only thing left to
test now are tags. `git tag -l` -- lo and behold, we have a tag called `secret`. Now, we can simply use `git show secret`
and get the tag message.

```text
bandit0@bandit:/tmp/tmp.fDJRcU0jUF/repo$ git show f17132340e8ee6c159e0a4a6bc6f80e1da3b1aea
47e603bb428404d265f59c42920d81e5
```

`git-show` works here because (from `man git-show`):

> Shows one or more objects (blobs, trees, tags and commits).
>
> (...)
>
> For tags, it shows the tag message and the referenced objects.

### Bandit 31

Password: `47e603bb428404d265f59c42920d81e5`

This time, you need to `push` your changes to get the password to the next level.

```bash
git clone ssh://bandit31-git@localhost/home/bandit31-git/repo
cd repo
echo 'May I come in?' > key.txt
rm .gitignore  # necessary because *.txt files are ignored
git add .
git commit -m 'Add key.txt'
git push
```

The push fails, but you get the password:

```text
bandit0@bandit:/tmp/tmp.fDJRcU0jUF/bandit31$ git push
Could not create directory '/home/bandit0/.ssh'.
The authenticity of host 'localhost (127.0.0.1)' can't be established.
ECDSA key fingerprint is SHA256:98UL0ZWr85496EtCRkKlo20X3OPnyPSB5tB5RPbhczc.
Are you sure you want to continue connecting (yes/no)? yes
Failed to add the host to the list of known hosts (/home/bandit0/.ssh/known_hosts).
This is a OverTheWire game server. More information on http://www.overthewire.org/wargames

bandit31-git@localhost's password:
Counting objects: 3, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 294 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
remote: ### Attempting to validate files... ####
remote:
remote: .oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.
remote:
remote: Well done! Here is the password for the next level:
remote: 56a9bf19c63d650ce78e6ec0354ee45e
remote:
remote: .oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.
remote:
To ssh://localhost/home/bandit31-git/repo
! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'ssh://bandit31-git@localhost/home/bandit31-git/repo'
```

### Bandit 32

Password: `56a9bf19c63d650ce78e6ec0354ee45e`

The only things in the UNIX-verse that are in all-caps are environment variables. So one of the first thing I tried was
typing `$PATH` in the shell.

```text
>> $PATH
sh: 1: /usr/local/bin:/usr/bin:/bin:/usr/games: not found
```

We now know two things, this shell invokes `sh` and the evaluated environment variables are **not** converted to
uppercase. This means that the shell capitalizes the input and passes it to `sh`. Running `sh` means using the `-c`
flag. From `man sh`, when `-c` is used, `$0` will contain the command name, like `argv[0]` in C, C++ and Python. So,
by simply writing `$0` into the shell, we invoke `sh` 🎊. If you want, you can then run `bash`. It turns out that we are
now `bandit33`! Getting the password for bandit33 is as simple as `cat`ing `/etc/bandit_pass/bandit33`.

### Bandit 33

Password: `c9c3199ddf4121b10cf581a98d51caee`

**Game Over!** Bandit 34 doesn't exist yet.

```text
bandit33@bandit:~$ cat README.txt
Congratulations on solving the last level of this game!

At this moment, there are no more levels to play in this game. However, we are constantly working
on new levels and will most likely expand this game with more levels soon.
Keep an eye out for an announcement on our usual communication channels!
In the meantime, you could play some of our other wargames.

If you have an idea for an awesome new level, please let us know!
```

---

I spent a lot of time on writing down and verifying these solutions. I learnt a lot of useful things from this challenge
and hope you do as well. If you find any problems with the solutions or any typos, please create an issue
[here](https://github.com/AbhyudayaSharma/abhyudayasharma.github.io/issues/).
