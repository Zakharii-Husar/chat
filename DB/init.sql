-- Create the chat database
CREATE DATABASE chat;
GO

USE chat;
GO

-- Enable contained database authentication
sp_configure 'contained database authentication', 1;
GO
RECONFIGURE;
GO

-- Set recovery model and other database options
ALTER DATABASE chat SET RECOVERY SIMPLE;
GO 