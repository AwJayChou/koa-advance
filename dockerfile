FROM  node 
ADD . /app/
EXPOSE 3000
WORKDIR /app
CMD ["node","./index.js"]