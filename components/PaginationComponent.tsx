'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
    itemCount: number
    pageSize: number
    currentPage: number
}

const PaginationComponent = ({ itemCount, pageSize, currentPage }: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize)

    if (pageCount <= 1) return null;

    return (
        <Pagination currentPage={currentPage} lastPage={pageCount}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={`?page=${currentPage - 1}`} />
                </PaginationItem>

                {currentPage !== 1 && (
                    <PaginationItem>
                        <PaginationLink href="?page=1">1</PaginationLink>
                    </PaginationItem>
                )}

                {currentPage > 3 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {currentPage > 2 && (
                    <PaginationItem>
                        <PaginationLink href={`?page=${currentPage - 1}`}>
                            {currentPage - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationLink href={`?page=${currentPage}`} isActive>
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>

                {currentPage < pageCount - 1 && (
                    <PaginationItem>
                        <PaginationLink href={`?page=${currentPage + 1}`}>
                            {currentPage + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                {currentPage < pageCount - 2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {currentPage !== pageCount && (
                    <PaginationItem>
                        <PaginationLink href={`?page=${pageCount}`}>
                            {pageCount}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext href={`?page=${currentPage + 1}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent