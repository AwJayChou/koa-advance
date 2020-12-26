FROM  node 
COPY . /app/
EXPOSE 3000
WORKDIR /app
CMD ["node","./app.js"]