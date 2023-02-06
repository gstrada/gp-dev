<?php

namespace App\Models\Filters;

use App\Helpers\Helper;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class LessThanFilter implements Filter {

    public function __invoke(Builder $query, $value, string $property) : Builder
    {
        if (strpos($property, '.') !== false) {
            list($table, $property) = explode('.', $property);
            return $query->whereHas($table, function ($q) use ($property, $value) {
                return $q->where($property, '<=', $value);
            });
        }
        return $query->where($property, '<=', $value);
    }
}

class StartsWithRawFilter implements Filter {

    public function __invoke(Builder $query, $value, string $property) : Builder
    {
        $value = strtolower(Helper::stripString($value));
        if (strpos($property, '.') !== false) {
            list($table, $property) = explode('.', $property);
            return $query->whereHas($table, function ($q) use ($property, $value) {
                return $q->where($property, 'LIKE', "$value%");
            });
        }
        return $query->where($property, 'LIKE', "$value%");
    }
}

class EndsWithRawFilter implements Filter {

    public function __invoke(Builder $query, $value, string $property) : Builder
    {
        $value = strtolower(Helper::stripString($value));
        if (strpos($property, '.') !== false) {
            list($table, $property) = explode('.', $property);
            return $query->whereHas($table, function ($q) use ($property, $value) {
                return $q->where($property, 'LIKE', "%$value");
            });
        }
        return $query->where($property, 'LIKE', "%$value");
    }
}

class ContainsRawFilter implements Filter {

    public function __invoke(Builder $query, $value, string $property) : Builder
    {
        $value = strtolower(Helper::stripString($value));
        if (strpos($property, '.') !== false) {
            list($table, $property) = explode('.', $property);
            return $query->whereHas($table, function ($q) use ($property, $value) {
                return $q->where($property, 'LIKE', "%$value%");
            });
        }
        return $query->where($property, 'LIKE', "%$value%");
    }
}

class MatchesRawFilter implements Filter {

    public function __invoke(Builder $query, $value, string $property) : Builder
    {
        $value = strtolower(Helper::stripString($value));
        if (strpos($property, '.') !== false) {
            list($table, $property) = explode('.', $property);
            return $query->whereHas($table, function ($q) use ($property, $value) {
                return $q->where($property, '=', "$value");
            });
        }
        return $query->where($property, '=', "$value");
    }
}

