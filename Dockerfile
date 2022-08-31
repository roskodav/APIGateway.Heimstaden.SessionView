#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["./APIGateway.Heimstaden.SessionView/APIGateway.Heimstaden.SessionView.csproj", "./APIGateway.Heimstaden.SessionView/"]
COPY ["./APIGateway.Core/APIGateway.Core/APIGateway.Core/APIGateway.Core.csproj", "./APIGateway.Core/APIGateway.Core/APIGateway.Core/"]
RUN dotnet restore "./APIGateway.Heimstaden.SessionView/APIGateway.Heimstaden.SessionView.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./APIGateway.Heimstaden.SessionView/APIGateway.Heimstaden.SessionView.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "./APIGateway.Heimstaden.SessionView/APIGateway.Heimstaden.SessionView.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "APIGateway.Heimstaden.SessionView.dll"]