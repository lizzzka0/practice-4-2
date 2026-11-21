import type { Book } from './task1-types';

const API_URL = 'https://6b018a171c637a569e5324e0.mockapi.io/api/books';

interface BookDTO {
  id: string;
  title: string;
  author: string;
  year: number;
  rating: number;
}

function mapFromServer(dto: BookDTO): Book {
  return {
    id: dto.id,
    title: dto.title,
    authors: dto.author,
    year: dto.year,
    rating: dto.rating,
  };
}

function mapToServer(book: Book): BookDTO {
  return {
    id: book.id,
    title: book.title,
    author: book.authors[0] ?? '',
    year: book.year ?? 0,
    rating: book.rating ?? 0,
  };
}

export async function fetchBooks(): Promise<Book[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const dtos: BookDTO[] = await response.json();
  return dtos.map(mapFromServer);
}

export async function saveBook(book: Book): Promise<Book> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mapToServer(book)),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const dto: BookDTO = await response.json();
  return mapFromServer(dto);
}

export async function deleteBook(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
}
