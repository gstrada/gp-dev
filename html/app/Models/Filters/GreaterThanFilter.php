<?php

namespace App\Models\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class GreaterThanFilter implements Filter
{

    public function __invoke(Builder $query, $value, string $property): Builder
    {
        if (strpos($property, '.') !== false) {
            list
                (
                $table,
                $property
                )
                = explode('.', $property);
            return $query->whereHas($table, function ($q) use ($property, $value) {
                return $q->where($property, '>=', $value);
            });
        }
        return $query->where($property, '>=', $value);
    }
}
